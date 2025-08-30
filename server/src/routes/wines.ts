import express from 'express';
import Wine from '../models/Wine';

const router = express.Router();

// Get all wines for a user
router.get('/', async (req: any, res) => {
  try {
    const wines = await Wine.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(wines);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Get a single wine
router.get('/:id', async (req: any, res) => {
  try {
    const wine = await Wine.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!wine) {
      return res.status(404).json({ message: 'Wine not found' });
    }
    
    res.json(wine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Create a new wine entry
router.post('/', async (req: any, res) => {
  try {
    const wineData = {
      ...req.body,
      userId: req.user.userId
    };
    
    const wine = new Wine(wineData);
    await wine.save();
    
    res.status(201).json(wine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Update a wine entry
router.put('/:id', async (req: any, res) => {
  try {
    const wine = await Wine.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!wine) {
      return res.status(404).json({ message: 'Wine not found' });
    }
    
    res.json(wine);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Delete a wine entry
router.delete('/:id', async (req: any, res) => {
  try {
    const wine = await Wine.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!wine) {
      return res.status(404).json({ message: 'Wine not found' });
    }
    
    res.json({ message: 'Wine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// Search wines
router.get('/search/:query', async (req: any, res) => {
  try {
    const query = req.params.query;
    const wines = await Wine.find({
      userId: req.user.userId,
      $or: [
        { winery: { $regex: query, $options: 'i' } },
        { varietal: { $regex: query, $options: 'i' } },
        { region: { $regex: query, $options: 'i' } },
        { country: { $regex: query, $options: 'i' } },
        { aromas: { $regex: query, $options: 'i' } },
        { flavors: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    res.json(wines);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export default router;
