const Food = require('../models/food');

module.exports = {
    addFood: async (req, res) => {
        const {title, foodTags,Category, code, restaurant, description, time, price, additives, imageUrl } = req.body

        if(!title || !foodTags ||!Category ||!code ||!restaurant ||!description ||!time ||!price ||!additives ||!imageUrl){
            return res.status(400).json({ status: false, message:"You Have a missing field"});
        }

        
        try {

            const newFood = new Food(req.body);

            await newFood.save();

            res.status(201).json({ status:true, message: "Food has been successfully added"})
            
        } catch (error) {
            res.status(500).json({ status: false, message: error.message});
        }
    },

    getFoodById: async(req, res)=> {
        const id = req.params.id;
        try {
            const food = await Food.findById(id);

            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message});
        }
    },

    getRandomFood: async(req, res) =>{
        const code = req.params.code;

        try {
            let randomFoodList = [];
            if(req.params.code){
                randomFoodList = await Food.aggregate([
                     { $match: { code: req.params.code }},
                     {$sample: { size: 3}},
                     {$project: {__v:0}}
                ]);
            }
// if no code provided in params or no food match
            if(!randomFoodList.length){
                randomFoodList = await Food.aggregate([
                   
                    {$sample: { size: 5}},
                    {$project: {__v:0}}
               ]);
            }
            // respond with the results
            if(randomFoodList.length){
                res.status(200).json(randomFoodList);
            }else{
                res.status(404).json({ status: false, message: 'No Foods found'});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllFoodsByCode: async (req, res) => {
        const code = req.params.code;
        try {
            const foodList = await Food.find({code: code});

            return res.status(200).json(foodList);
        } catch (error) {
            return res.ststus(500).json({ status:false, message: error.message});
        }
    },
// restaurant menu
    getFoodByRestaurant: async(req, res) => {

        const id = req.params.id;

        try {
            const foods = await Food.find({restaurant: id});

            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message});
        }
    },

     getFoodByCategoryAndCode: async (req, res)=> {
        const { category, code} = req.params;
        try {
            const foods = await Food.aggregate([
                {$match:{category: category, code: code, isAvailable: true} },
                {$project: {__v:0}}
            ]);

            if(foods.length ===0){
                return res.status(200).json([]);
            }

            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message});
        }
     },

     searchFoods: async (req, res) => {
        const search = req.params.search;

        try {
            const results = await Food.aggregate([
                {
                    $search:{
                        index: "foods",
                        text: {
                            query: search,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ])
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message});
        }
     },

     getRandomFoodsByCategoryAndCode: async (req, res) => {
        const { category, code} = req.params;
        try {
            let foods;

            foods = await Food.aggregate([
                {$match:{category: category, code: code, isAvailable: true} },
                {$sample: { size: 10}},
                
            ])

            if(!foods || foods.length ===0){
                foods = await Food.aggregate([
                {$match:{ code: code,isAvailable: true} },
                {$sample: { size: 10}},
                ])
            }else if(!foods || foods.length ===0){
                foods = await Food.aggregate([
                    {$match:{ isAvailable: true} },
                    {$sample: { size: 10}},
            ])
            }
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message});
        }
     }
};