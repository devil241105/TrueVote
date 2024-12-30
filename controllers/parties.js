import partyModel from '../models/party.js';

const addParty = async (req, res) => {
    try {
        console.log(req.body);
        const { name, yearWon, about, motive } = req.body;
        const newParty = new partyModel({
            name,
            yearWon,
            about,
            motive,
        });
        await newParty.save();
        res.status(200).json({ success: true, message: "Party added successfully", Party: newParty });
    } catch (error) {
        console.error("Party error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

const deleteParty = async (req, res) => {
    try {
        const party = await partyModel.findById(req.params.id);
        if (!party) {
            return res.status(404).json({ success: false, message: "Party not found" });
        }
        await party.remove();
        res.status(200).json({ success: true, message: "Party deleted successfully" });
    } catch (error) {
        console.error("Party error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

const getParties = async (req, res) => {
    try {
        const parties = await partyModel.find();
        res.status(200).json({ success: true, parties });
    } catch (error) {
        console.error("Party error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

const getParty = async (req, res) => {
    try {
        const party = await partyModel.findById(req.params.id);
        if (!party) {
            return res.status(404).json({ success: false, message: "Party not found" });
        }
        res.status(200).json({ success: true, party });
    } catch (error) {
        console.error("Party error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

const updateParty = async (req, res) => {
    try {
        const { name, yearWon, about, motive } = req.body;
        const party = await partyModel.findById(req.params.id);
        if (!party) {
            return res.status(404).json({ success: false, message: "Party not found" });
        }
        party.name = name;
        party.yearWon = yearWon;
        party.about = about;
        party.motive = motive;
        await party.save();
        res.status(200).json({ success: true, message: "Party updated successfully", party });
    } catch (error) {
        console.error("Party error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

export { addParty, deleteParty, getParties, getParty, updateParty };