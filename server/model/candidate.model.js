import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  partyImage: {
    type: String,
    required: true,
  },
  partyName: {
    type: String,
    required: true,
    default: 'N/A',
  },
  partySymbol: {
    type: String,
    default: '',
  },
  manifestoWords: {
    type: String,
    default: '',
  },
  manifestoDescription: {
    type: String,
    default: '',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Candidate', candidateSchema);