import Candidate from "../model/candidate.model.js";
import User from "../model/user.model.js";

import cloudinary from "../config/cloudinary.js";

import bcrypt from "bcrypt";

// export const postManifesto = async (req, res) => {
//   try {
//     const { id } = req.params
//     const data = req.body
//     const file = req.file
//     data.user = id
//     let picture_url = await cloudinary.v2.uploader.upload(file.path)
//     data.partyImage = picture_url.secure_url
//     if (data) {
//       const response = await Candidate.create(data)
//       res.status(200).json({
//         status: true,
//         message: 'Succesfully created manifesto',
//         data: response,
//       })
//     } else {
//       res.status(401).json({
//         message: 'Failed to create manifesto!! Enter all the fields',
//       })
//     }
//   } catch (error) {
//     res.status(401).json({
//       status: false,
//       message: error.message,
//     })
//   }
// }
export const postManifesto = async (req, res) => {
  try {
    const { partyName, partySymbol, manifestoFocus, manifestoDescription } =
      req.body;
    const files = req.files; // Array of uploaded files
    const candidateId = req.params.id; // Candidate ID from URL

    // Validate required fields
    if (
      !files ||
      files.length === 0 ||
      !partyName ||
      !partySymbol ||
      !manifestoFocus ||
      !manifestoDescription
    ) {
      return res.status(400).json({
        message: "All fields are required, including at least one image.",
      });
    }

    // Process the form data and files
    const manifestoData = {
      partyName,
      partySymbol,
      manifestoFocus,
      manifestoDescription,
      images: files.map((file) => file.path), // Store file paths
      candidateId,
    };

    // Example: Save to database (e.g., MongoDB)
    // const manifesto = await Manifesto.create(manifestoData);

    res.status(200).json({ message: "Manifesto submitted successfully" });
  } catch (error) {
    console.error("Error processing manifesto:", error);
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};
export const getAllManifestos = async (req, res) => {
  try {
    const { id } = req.params;
    const manifestos = await Candidate.find({ user: id });
    if (manifestos) {
      res.status(200).json({
        status: true,
        data: manifestos,
      });
    } else {
      res.status(401).json({
        message: "Failed to retrieve manifestos",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error,
    });
  }
};

export const getManifestos = async (req, res) => {
  try {
    const manifestos = await Candidate.find();
    if (manifestos) {
      res.status(200).json({
        status: true,
        data: manifestos,
      });
    } else {
      res.status(401).json({
        message: "Failed to retrieve manifestos",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error,
    });
  }
};

export const candidateRegister = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;
    const saltRounds = 10;

    const { email, phone_No, citizenship_no, location, name, party } = body;

    // Upload image to cloudinary
    let picture_url = "";
    if (file) {
      const uploadRes = await cloudinary.v2.uploader.upload(file.path);
      picture_url = uploadRes.secure_url;
    }

    const checkEmail = await User.findOne({ email });
    const checkPhoneNo = await User.findOne({ phone_No });
    const checkCitizenshipNo = await User.findOne({ citizenship_no });

    if (checkEmail || checkPhoneNo) {
      return res
        .status(200)
        .json({ status: false, message: "Email or Phone Number already used" });
    }

    if (checkCitizenshipNo) {
      return res
        .status(200)
        .json({ status: false, message: "Citizenship Number must be unique" });
    }

    // Set user info
    body.pictureURL = picture_url;
    body.user_type = "candidate";

    // Hash password and create user
    const hash = await bcrypt.hash("password", saltRounds);
    body.password = hash;

    const userData = await User.create(body);

  
    const candidateData = {
      partyImage: picture_url,
      partyName: party || "N/A",
      partySymbol: "",
      manifestoWords: "",
      manifestoDescription: "",
      user: userData._id,
    };

    const candidate = await Candidate.create(candidateData);

    return res.status(200).json({
      status: true,
      message: "Register Successful",
      data: {
        user: userData,
        candidate,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
