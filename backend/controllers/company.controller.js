import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        let { name: companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is mandatory",
                success: false
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company is already registered",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        return res.status(201).json({
            message: "company registered successfully",
            suuccess: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const company = await Company.find({ userId });
        if (!company) {
            return res.status(404).json({
                message: "Companies not Found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Companies are",
            company,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not Found",
                success: false
            })
        }
        if (company) {
            return res.status(200).json({
                company,
                success: true
            })
        }

    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        const updatedData = { name, description, website, location };
        const company = await Company.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not Found",
                success: false
            })
        }
        if (company) {
            return res.status(200).json({
                message: "information updated successfull",
                success: true
            })
        }
    } catch (error) {
        console.log(error)
    }
}