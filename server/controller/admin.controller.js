import Admin from "../model/admin.model.js";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ 
        status: false, 
        message: "Invalid credentials" 
      });
    }

    // 2. Compare passwords (plain text comparison)
    if (password !== admin.password) {
      return res.status(401).json({ 
        status: false, 
        message: "Invalid credentials" 
      });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { 
        id: admin._id,
        email: admin.email,
        user_type: admin.user_type 
      },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1h" }
    );

    // 4. Return success response
    res.status(200).json({
      status: true,
      data: {
        name: admin.name,
        email: admin.email,
        token
      }
    });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ 
      status: false, 
      message: "Server error" 
    });
  }
};