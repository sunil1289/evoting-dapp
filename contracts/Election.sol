// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // Updated to a more recent version for security

contract Election {
    // Struct for Candidate
    struct Candidate {
        uint256 id;
        string name;
        string party;
        string citizenshipNo;
        string dob;
        string img;
        string email;
        uint256 votecount;
    }

    // Struct for Voter
    struct Voter {
        string userHash; // Keccak-256 hash of citizenship_no + email
        bool registered;
        string voteHash; // Keccak-256 hash of voter address + candidate ID
    }

    // Candidate count
    uint256 public candidatesCount;

    // Random vote count for demonstration
    uint256[5] ranvote = [43, 35, 48, 70, 50];
    uint256 i = 5;
    uint256 public temp;

    // Mappings
    mapping(uint256 => Candidate) public candidates;
    mapping(address => Voter) public voters; // Changed from votedornot to store userHash and voteHash
    mapping(address => bool) public votedornot; // Keep for compatibility

    // Constructor
    constructor() {
        addCandidates(
            "KP Oli",
            "CPN",
            "010570487",
            "22/02/1952",
            "https://res.cloudinary.com/dynbrzezs/image/upload/v1643896000/uploads/kp-oli_d3p1a4.jpg",
            "kpoli1@nepal.com"
        );
        addCandidates(
            "Sher Bahadur Deuba",
            "NCP",
            "015678998",
            "30/05/1952",
            "https://res.cloudinary.com/dynbrzezs/image/upload/v1643895800/uploads/SBDNCP_1_zkp6yb.jpg",
            "sherbdrdeuba@nepal.com"
        );
        addCandidates(
            "Gagan Thapa",
            "NCP",
            "015678795",
            "30/05/1982",
            "https://res.cloudinary.com/dynbrzezs/image/upload/v1643895809/uploads/GTNCP_fr9952.jpg",
            "gaganthapa@nepal.com"
        );
        addCandidates(
            "Puspa Kamal Dahal",
            "UML",
            "015676985",
            "30/05/1962",
            "https://res.cloudinary.com/dynbrzezs/image/upload/v1644222965/uploads/pkd_nmh3nm.jpg",
            "puspakdahal@nepal.com"
        );
        addCandidates(
            "Kamal Thapa",
            "RPP",
            "015677867",
            "30/05/1972",
            "https://res.cloudinary.com/dynbrzezs/image/upload/v1644222973/uploads/kt_otu8tp.jpg",
            "kamalthapa@nepal.com"
        );
    }

    // Add Candidate
    function addCandidates(
        string memory name,
        string memory party,
        string memory citizenshipNo,
        string memory dob,
        string memory img,
        string memory email
    ) public {
        candidatesCount++;
        if (i > 0) {
            temp = ranvote[i - 1];
            candidates[candidatesCount] = Candidate(candidatesCount, name, party, citizenshipNo, dob, img, email, temp);
            i--;
        } else {
            candidates[candidatesCount] = Candidate(candidatesCount, name, party, citizenshipNo, dob, img, email, 0);
        }
    }

    // Delete Candidate
    function delCandidates(uint256 id) public {
        require(id <= candidatesCount && id > 0, "Invalid candidate ID");
        while (id < candidatesCount) {
            candidates[id] = candidates[id + 1];
            id += 1;
        }
        delete candidates[candidatesCount];
        candidatesCount--;
    }

    // Edit Candidate
    function editCandidates(
        uint256 id,
        string memory name,
        string memory party,
        string memory citizenshipNo,
        string memory dob,
        string memory email
    ) public {
        require(id <= candidatesCount && id > 0, "Invalid candidate ID");
        candidates[id].name = name;
        candidates[id].party = party;
        candidates[id].citizenshipNo = citizenshipNo;
        candidates[id].dob = dob;
        candidates[id].email = email;
    }

    // Register User with Keccak-256 Hash
    function registerUser(string memory _dataToHash) public {
        require(!voters[msg.sender].registered, "User already registered");
        bytes32 userHash = keccak256(abi.encodePacked(_dataToHash));
        voters[msg.sender] = Voter(string(abi.encodePacked(userHash)), true, "");
    }

    // Verify User Hash
    function verifyUser(address _user, string memory _dataToHash) public view returns (bool) {
        bytes32 userHash = keccak256(abi.encodePacked(_dataToHash));
        return keccak256(abi.encodePacked(voters[_user].userHash)) == userHash;
    }

    // Vote with Keccak-256 Hash
    function vote(uint256 _id) public {
        require(voters[msg.sender].registered, "User not registered");
        require(!votedornot[msg.sender], "You have already voted");
        require(_id <= candidatesCount && _id > 0, "Invalid candidate ID");

        // Generate vote hash (voter address + candidate ID)
        bytes32 voteHash = keccak256(abi.encodePacked(msg.sender, _id));
        voters[msg.sender].voteHash = string(abi.encodePacked(voteHash));
        votedornot[msg.sender] = true;
        candidates[_id].votecount += 1;
    }

    // Verify Vote Hash
    function verifyVote(address _voter, uint256 _candidateId) public view returns (bool) {
        bytes32 voteHash = keccak256(abi.encodePacked(_voter, _candidateId));
        return keccak256(abi.encodePacked(voters[_voter].voteHash)) == voteHash;
    }
}