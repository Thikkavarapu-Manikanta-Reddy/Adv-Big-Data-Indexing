const checks = require('../utils.js');
const db = require('../redis.js');

const planController = {}

planController.create = async (req, res, next) => {
    if (checks.validator(req.body)) {
        const value = await db.getPlan(req.body.objectId);
        console.log("What", value);
        if (value) {
            res.set("ETag", value.ETag).status(409).json({ "message": "item already exists" });
            console.log("item already exists");
            return;
        }
        else {
            const ETag = (await db.createPlan(req.body)).ETag;
            res.set("ETag", ETag).status(201).json({
                "message":"item added",
                "ETag" : ETag});
            console.log("item added");
            return;
        }
    }
    else {
        res.status(400).json({ "message": "item isn't valid" });
        console.log("item isn't valid");
        return;
    }
}

planController.getById = async (req, res, next) => {
    console.log(req.params.planId);
    const value = await db.getPlan(req.params.planId);
    if (value.objectId == req.params.planId) {
        if (req.headers['if-none-match'] && value.ETag == req.headers['if-none-match']) {
            res.set("ETag", value.ETag).status(304).json();
            console.log("unchanged plan found: ", JSON.parse(value.plan));
            return;
        }
        else {
            res.set("ETag", value.ETag).status(200).json({
                "message": "plan changed",
                "plan": JSON.parse(value.plan)
            });
            console.log("changed plan found: ", JSON.parse(value.plan));
            return;
        }
    }
    else {
        res.status(404).json({ "message": "plan not found" });
        console.log("plan not found");
        return;
    }
}

planController.delete = async (req, res) => {
    const value = await db.getPlan(req.params.planId);
    if (value.objectId == req.params.planId) {
        console.log("item found: ", JSON.parse(value.plan));
        if (db.deletePlan(req.params)) {
            console.log("item deleted");
            res.status(204).json();
        }
        else {
            console.log("item not deleted");
            res.status(500).json({ "message": "item not deleted" });
        }
        return;
    }
    else {
        res.status(404).json({ "message": "plan not found" });
        console.log("plan not found");
        return;
    }
}





module.exports = planController;