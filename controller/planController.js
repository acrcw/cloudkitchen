const planmodel = require("../modals/mealmodal");
const stripe = require('stripe')('sk_test_51NVoSgSFnLmMeVsDYJcCwzpQmv0MX8VgN791e2ypGGyy9BHzGkoEz5VrjKjfP22SWTMSYKxFbLzdu4XsyDx6vIgS00WL8heiGv');
//done
module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        console.log("hello")
        let plans = await planmodel.find();
        if (plans) {
            return res.json({
                message: "all plans recived",
                totalplans: plans.length,
                data: plans
            })
        }
        else {
            return res.json({
                message: "plans not found"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
//done
module.exports.getPlan = async function getPlan(req, res) {
    try {

        let id = req.params.id
        let plan = await planmodel.findById(id);
        if (plan) {
            return res.json({
                message: "plan recived",
                data: plan
            })
        }
        else {
            return res.json({
                message: "plan not found"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
//done
module.exports.createPlan = async function createPlan(req, res) {
    try {
        let plandata = req.body;
        const createdproduct = await stripe.products.create({
            name: plandata.name,
            description: plandata.description,
            default_price_data: {
                currency: "INR",
                unit_amount: plandata.price * 100
            }
        })
        console.log(createdproduct);
        plandata.stripeId = createdproduct.id;
        let createdPlan = await planmodel.create(plandata);
        res.json({
            message: "plan created Sucessfully & product created in stripe",
            plan: createdPlan,
            product: createdproduct
        })
        // createprices; 







    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id;
        let deletedPlan = await planmodel.findByIdAndDelete(id);
        return res.json({
            message: "plan deleted Sucessfully",
            data: deletedPlan
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
//done
module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let plan = await planmodel.findById(id);
        let datatobeupdated = req.body;
        if (plan) {
            const keys = [];
            for (let key in datatobeupdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                plan[keys[i]] = datatobeupdated[keys[i]]
            }
            const updatedplan = await plan.save();
            return res.json({
                message: "plan updated",
                updateddata: updatedplan
            })
        }
        else {
            res.json({
                message: "plan not found"
            })
        }
    }
    catch (err) {
        res.json({
            message: err
        })
    }
}
// get top three plans
module.exports.topthreeplans = async function topthreeplans(req, res) {
    try {
        const top3plans = await planmodel.find().sort({ ratingAverage: -1 }).limit(3)
        return res.json({ message: "top 3", data: top3plans })
    }
    catch (err) {
        return res.status(500).json({ message: "plans not found" })
    }
}