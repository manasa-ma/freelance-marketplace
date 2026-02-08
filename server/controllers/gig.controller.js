const Gig = require("../models/Gig");

exports.createGig = async (req, res) => {
  // 1. Check if user is a seller
  if (!req.isSeller) return res.status(403).send("Only sellers can create gigs!");

  // 2. Create the gig object
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    // 3. FIX: Save the newGig (not newUser)
    const savedGig = await newGig.save(); 
    console.log("Success: Gig saved to DB");
    res.status(201).json(savedGig);
  } catch (err) {
    console.log("DB Error:", err.message);
    res.status(500).send("Error creating gig: " + err.message);
  }
};

// Add this function too so we can see them on the home page later
exports.getGigs = async (req, res) => {
  const q = req.query;
  const filters = {
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: parseInt(q.min) }),
        ...(q.max && { $lt: parseInt(q.max) }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    res.status(500).send("Error fetching gigs");
  }
};
// ... keep your createGig and getGigs functions ...

exports.deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) return res.status(404).send("Gig not found!");

    // Check if the person trying to delete is the owner
    if (gig.userId !== req.userId) {
      return res.status(403).send("You can only delete your own gigs!");
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
// ... existing createGig, getGigs, deleteGig functions ...

exports.getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).send("Gig not found!");
    res.status(200).send(gig);
  } catch (err) {
    res.status(500).send("Error fetching gig: " + err.message);
  }
};