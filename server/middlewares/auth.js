import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    // ✅ SAFELY get auth info using function now
    const authData = req.auth(); // <-- call it as a function

    if (!authData || !authData.userId) {
      return res.status(401).json({
        success: false,
        message: "Not logged in",
      });
    }

    const userId = authData.userId;

    // ✅ Check premium plan
    const hasPremiumPlan = await authData.has({ plan: "premium" });

    // ✅ Get full user
    const user = await clerkClient.users.getUser(userId);

    // ✅ Free usage logic (safe)
    if (!hasPremiumPlan) {
      req.free_usage = user.privateMetadata?.free_usage ?? 0;
    } else {
      req.free_usage = Infinity; // premium = unlimited
    }

    // ✅ VERY IMPORTANT (controllers depend on this)
    req.userId = userId;
    req.plan = hasPremiumPlan ? "premium" : "free";
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
