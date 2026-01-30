export const generateHF = async (
  prompt,
  maxTokens = 500,
  temperature = 0.7
) => {
  if (!prompt) {
    throw new Error("Prompt is required");
  }

  if (!process.env.HUGGINGFACE_API_KEY) {
    throw new Error("HUGGINGFACE_API_KEY missing in .env");
  }

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3-8B-Instruct",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: maxTokens,
          temperature,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("HF API ERROR:", data);
      throw new Error(data?.error || "Hugging Face API failed");
    }

    return data?.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("HF GENERATE ERROR:", error.message);
    throw error;
  }
};
