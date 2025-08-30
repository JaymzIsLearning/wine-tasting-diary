import mongoose, { Document, Schema } from 'mongoose';

export interface IWine extends Document {
  userId: mongoose.Types.ObjectId;
  winery: string;
  wineMaker?: string;
  varietal: string;
  vintage: number;
  region: string;
  country: string;
  price?: number;
  rating?: number;
  
  // Appearance
  clarity: string;
  intensity: string;
  color: string;
  
  // Nose
  condition: string;
  noseIntensity: string;
  aromas: string[];
  
  // Palate
  sweetness: string;
  acidity: string;
  tannin: string;
  alcohol: string;
  body: string;
  flavorIntensity: string;
  flavors: string[];
  finish: string;
  
  // Conclusions
  qualityLevel: string;
  readiness: string;
  personalNotes: string;
  
  // Metadata
  tastingDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const wineSchema = new Schema<IWine>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  winery: {
    type: String,
    required: true,
    trim: true
  },
  wineMaker: {
    type: String,
    trim: true
  },
  varietal: {
    type: String,
    required: true,
    trim: true
  },
  vintage: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  region: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    min: 0
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  
  // Appearance
  clarity: {
    type: String,
    enum: ['Clear', 'Hazy', 'Cloudy'],
    default: 'Clear'
  },
  intensity: {
    type: String,
    enum: ['Pale', 'Medium', 'Deep'],
    default: 'Medium'
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  
  // Nose
  condition: {
    type: String,
    enum: ['Clean', 'Unclean'],
    default: 'Clean'
  },
  noseIntensity: {
    type: String,
    enum: ['Light', 'Medium', 'Pronounced'],
    default: 'Medium'
  },
  aromas: [{
    type: String,
    trim: true
  }],
  
  // Palate
  sweetness: {
    type: String,
    enum: ['Dry', 'Off-dry', 'Medium-dry', 'Medium-sweet', 'Sweet', 'Luscious'],
    default: 'Dry'
  },
  acidity: {
    type: String,
    enum: ['Low', 'Medium-', 'Medium', 'Medium+', 'High'],
    default: 'Medium'
  },
  tannin: {
    type: String,
    enum: ['Low', 'Medium-', 'Medium', 'Medium+', 'High'],
    default: 'Medium'
  },
  alcohol: {
    type: String,
    enum: ['Low', 'Medium-', 'Medium', 'Medium+', 'High'],
    default: 'Medium'
  },
  body: {
    type: String,
    enum: ['Light', 'Medium-', 'Medium', 'Medium+', 'Full'],
    default: 'Medium'
  },
  flavorIntensity: {
    type: String,
    enum: ['Light', 'Medium', 'Pronounced'],
    default: 'Medium'
  },
  flavors: [{
    type: String,
    trim: true
  }],
  finish: {
    type: String,
    enum: ['Short', 'Medium', 'Long'],
    default: 'Medium'
  },
  
  // Conclusions
  qualityLevel: {
    type: String,
    enum: ['Faulty', 'Poor', 'Acceptable', 'Good', 'Very Good', 'Outstanding'],
    default: 'Good'
  },
  readiness: {
    type: String,
    enum: ['Too Young', 'Can Drink Now, But Better Later', 'Ready to Drink', 'Past Its Best'],
    default: 'Ready to Drink'
  },
  personalNotes: {
    type: String,
    trim: true
  },
  
  // Metadata
  tastingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for search functionality
wineSchema.index({ userId: 1, createdAt: -1 });
wineSchema.index({ userId: 1, winery: 1 });
wineSchema.index({ userId: 1, varietal: 1 });
wineSchema.index({ userId: 1, vintage: 1 });

export default mongoose.model<IWine>('Wine', wineSchema);
