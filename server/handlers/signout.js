const signOut = async (req, res) => {
  try {
    // Clear the user's session or token
    req.session.destroy((err) => {
      if (err) {
        console.log("Error clearing session:", err);
        res.status(500).json({ message: "Failed to sign out" });
      } else {
        console.log("User signed out successfully");
        res.status(200).json({ message: "User signed out successfully" });
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signOut };
