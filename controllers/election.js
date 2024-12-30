import electionModel from '../models/election.js';
import partyModel from '../models/party.js';
import userModel from "../models/user.js";
import cookieParser from 'cookie-parser';

const addElection = async (req, res) => {
    try {
        const { title, dateToHeld, about } = req.body;
        const newElection = new electionModel({
            title,
            dateToHeld,
            about,
        });
        await newElection.save();
        res.status(200).json({ success: true, message: "Election added successfully", Election: newElection });
    } catch (error) {
        console.error("Election error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

const deleteElection = async (req, res) => {
    try {
        const election = await electionModel.findById(req.params.id);
        if (!election) {
            return res.status(404).json({ success: false, message: "Election not found" });
        }
        await election.remove();
        res.status(200).json({ success: true, message: "Election deleted successfully" });
    } catch (error) {
        console.error("Election error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

const updateElection = async (req, res) => {
    try {
        const election = await electionModel.findById(req.params.id);
        if (!election) {
            return res.status(404).json({ success: false, message: "Election not found" });
        }

        const { name, dateToHeld, about } = req.body;

        election.name = name;
        election.dateToHeld = dateToHeld;
        election.about = about;

        await election.save();

        res.status(200).json({
            success: true,
            message: "Election updated successfully",
            election,
        });
    } catch (error) {
        console.error("Error updating election:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

const getElections = async (req, res) => {
    try {
        const elections = await electionModel.find();
        res.status(200).json({ success: true, elections });
    } catch (error) {
        console.error("Error fetching elections:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

const getElection = async (req, res) => {
    try {
        const election = await electionModel.findById(req.params.id);
        if (!election) {
            return res.status(404).json({ success: false, message: "Election not found" });
        }
        res.status(200).json({ success: true, election });
    } catch (error) {
        console.error("Error fetching election:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}


const addPartiesToElection = async (req, res) => {
    try {
        const user = await userModel.findById(req.cookies.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ success: false, message: "You are not authorized to perform this action" });
        }

        const election = await electionModel.findById(req.params.id);
        if (!election) {
            return res.status(404).json({ success: false, message: "Election not found" });
        }

        const { partyId } = req.body;

        const party = await partyModel.findById(partyId);
        if (!party) {
            return res.status(404).json({ success: false, message: "Party not found" });
        }

        if (!election.parties.includes(partyId)) {
            election.parties.push(partyId);
        } else {
            return res.status(400).json({ success: false, message: "Party already added to this election" });
        }

        await election.save();

        res.status(200).json({
            success: true,
            message: "Party added successfully to the election",
            election,
        });
    } catch (error) {
        console.error("Error adding party:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};



export { addElection, deleteElection, updateElection, getElections, getElection, addPartiesToElection };