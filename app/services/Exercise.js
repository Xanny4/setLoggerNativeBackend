const Exercise = require("../models/Exercise");
const Set = require("../models/Set");

module.exports = {
    getExercises: async (page = 1, pageSize = 10) => {
        try {
            const skip = (page - 1) * pageSize;
            const limit = pageSize;

            const exercises = await Exercise.aggregate([
                {
                    $lookup: {
                        from: "sets",
                        localField: "_id",
                        foreignField: "exerciseId",
                        as: "sets"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        imageURL: 1,
                        sets: { $size: "$sets" }
                    }
                },
                {
                    $sort: { sets: -1 } // Sort by the number of sets
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);

            return exercises;
        } catch (error) {
            console.error("Error fetching exercises sorted by sets:", error);
            throw error;
        }
    },

    getExerciseById: async (id) => {
        try {
            return await Exercise.findById(id);
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting an exercise", error);
        }
    },
    createExercise: async (data) => {
        try {
            const newExercise = new Exercise(data);
            const savedExercise = await newExercise.save();
            return { Exercise: savedExercise, message: "Exercise created successfully!" };
        } catch (error) {
            console.error("Error creating Exercise:", error);
            throw new Error("Error creating Exercise");
        }

    },
    deleteExercise: async (id) => {
        try {
            const exercise = await Exercise.findByIdAndDelete(id);

            if (!exercise)
                throw new Error("Exercise not found");
        }
        catch (error) {
            console.log(error);
            throw new Error("Error deleting a exercise", error);
        }
    }
}