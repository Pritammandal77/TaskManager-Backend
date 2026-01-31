export const accessTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",   // ✅ change from strict
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    path: "/",          // important
};

export const refreshTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",    // ✅ change from strict
    maxAge: 28 * 24 * 60 * 60 * 1000, // 28 days
    path: "/",           // important
};
