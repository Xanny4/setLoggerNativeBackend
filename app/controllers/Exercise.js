const exerciseService = require('../services/Exercise');

module.exports = {
    getExercises: async (req, res) => {
        try {
            const { page, pageSize } = req.query;
            const exercises = await exerciseService.getExercises(page, pageSize);
            res.status(200).json(exercises);
        }
        catch (err) {
            res.status(500).json(err);
        }

    },
    getExerciseById: async (req, res) => {
        try {
            const exercise = await exerciseService.getExerciseById(req.params.id);
            res.status(200).json(exercise);
        }
        catch (err) {
            res.status(500).send(err);
        }

    },
    createExercise: async (req, res) => {
        try {
            const { exercise } = req.body;
            const newExercise = await exerciseService.createExercise(exercise);
            res.status(200).json(newExercise);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    modifyExercise: async (req, res) => {
        try {
            const id = req.params.id;
            const exercise = req.body;
            await exerciseService.modifyExercise(exercise, id);
            res.status(200).json({ message: "Exercise updated" });
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    deleteExercise: async (req, res) => {
        try {
            const id = req.params.id;
            await exerciseService.deleteExercise(id);
            res.status(200).json({ message: "Exercise deleted" });
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
}