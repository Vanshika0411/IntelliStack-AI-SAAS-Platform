import { createRequire } from "module";
const require = createRequire(import.meta.url);
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
const pdfParse = require("pdf-parse");
import { generateHF } from "../configs/huggingface.js";

/* ================= ARTICLE ================= */

export const generateArticle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt, length = 400 } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }

    const finalPrompt = `
You are a professional article writer.
Write a detailed article with headings and conclusion.
Minimum ${length} words.

Topic:
${prompt}
`;

    const content = await generateHF(finalPrompt, length * 2, 0.7);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({ success: true, content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ================= BLOG TITLE ================= */

export const generateBlogTitle = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt } = req.body;
    const { plan, free_usage } = req;

    if (!prompt) return res.json({ success: false, message: "Prompt required" });

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
    }

    const finalPrompt = `
Generate 5 catchy, SEO-friendly blog titles.
Topic: ${prompt}
`;

    const content = await generateHF(finalPrompt, 120, 0.5);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({ success: true, content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};





export const generateImage = async (req, res) => {
  try {
    // 1️⃣ SAFETY LOGS
    console.log("User:", req.user);
    console.log("User ID:", req.userId);
    console.log("Plan:", req.plan);
    console.log("Body:", req.body);

    // 2️⃣ USER ID STRICT CHECK
    const userId = req.userId || req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    // 3️⃣ PROMPT CHECK
    const { prompt, publish = false } = req.body;
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // 4️⃣ CLIPDROP REQUEST (🔥 FIXED HEADERS)
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          "User-Agent": "Mozilla/5.0", // ✅ MANDATORY (403 fix)
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      },
    );

    // 5️⃣ BASE64 CONVERT
    const base64Image = `data:image/png;base64,${Buffer.from(data).toString(
      "base64",
    )}`;

    // 6️⃣ CLOUDINARY UPLOAD
    const uploadRes = await cloudinary.uploader.upload(base64Image);

    if (!uploadRes.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    // 7️⃣ DATABASE INSERT
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${uploadRes.secure_url}, 'image', ${publish})
    `;

    // 8️⃣ SUCCESS RESPONSE
    res.json({
      success: true,
      content: uploadRes.secure_url,
    });
  } catch (err) {
    console.error("Generate Image Error:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Image generation failed",
    });
  }
};
/* ================= RESUME REVIEW ================= */

export const resumeReview = async (req, res) => {
  try {
    const userId = req.userId;
    const resume = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.json({ success: false, message: "Premium feature only" });
    }

    if (!resume) {
      return res.json({ success: false, message: "Resume file required" });
    }

    const buffer = fs.readFileSync(resume.path);
    const pdfData = await pdfParse(buffer);

    const resumeText = pdfData.text.slice(0, 3500);

    const finalPrompt = `
You are a professional resume reviewer.

Give structured output with:
1. Overall Summary
2. Strengths
3. Weaknesses
4. Improvements
5. ATS Optimization Tips

Resume:
${resumeText}
`;

    const content = await generateHF(finalPrompt, 900, 0.3);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Resume Review', ${content}, 'resume-review')
    `;

    res.json({ success: true, content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ================= REMOVE IMAGE BACKGROUND ================= */

export const removeImageBackground = async (req, res) => {
  try {
    const userId = req.userId;
    const image = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.json({ success: false, message: "Premium feature only" });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [{ effect: "background_removal" }],
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove image background', ${secure_url}, 'image')
    `;

    res.json({ success: true, content: secure_url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= REMOVE IMAGE OBJECT ================= */

export const removeImageObject = async (req, res) => {
  try {
    const userId = req.userId;
    const { object } = req.body;
    const image = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.json({ success: false, message: "Premium feature only" });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Removed ${object}`}, ${imageUrl}, 'image')
    `;

    res.json({ success: true, content: imageUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
