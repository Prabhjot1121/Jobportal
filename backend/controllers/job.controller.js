import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        })
        return res.status(201).json({
            message: "New Job Created",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };
        const jobs = await Job.find(query).populate('company').populate('created_by').populate('application').sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(400).json({
                message: "no jobs found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getJobsById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const jobs = await Job.findById(jobId).populate('company').populate('created_by').populate('application');
        if (!jobs) {
            return res.status(400).json({
                message: "no jobs found",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminID = req.id;
        const jobs = await Job.find({ created_by: adminID });
        if (!jobs) {
            return res.status(400).json({
                message: "no jobs found",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}