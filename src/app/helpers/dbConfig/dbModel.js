const { mongoose } = require("mongoose");

const { Schema } = mongoose;

// Part One
let part_oneSchema = new Schema({
  questions: [
    {
      question: {
        type: String,
        required: true,
        max: 1000,
        min: 3,
      },
    },
  ],
  thinkingTime: {
    count: {
      type: Number,
      required: true,
    },
    count_type: {
      type: String,
      required: true,
    },
  },
  speakingTime: {
    count: {
      type: Number,
      required: true,
    },
    count_type: {
      type: String,
      required: true,
    },
  },
  isPremium: {
    type: Boolean,
    required: true,
  },
});

export const PartOne =
  mongoose.models.PartOne || mongoose.model("PartOne", part_oneSchema);

// Part Two

let part_twoSchema = new Schema({
  part_two: {
    questions: [
      {
        question: {
          type: String,
          required: true,
          max: 1000,
          min: 3,
        },
      },
    ],
    thinkingTime: {
      count: {
        type: Number,
        required: true,
      },
      count_type: {
        type: String,
        required: true,
      },
    },
    speakingTime: {
      count: {
        type: Number,
        required: true,
      },
      count_type: {
        type: String,
        required: true,
      },
    },
    isPremium: {
      type: Boolean,
    },
  },
  part_three: {
    questions: [
      {
        question: {
          type: String,
          required: true,
          max: 1000,
          min: 3,
        },
      },
    ],
    thinkingTime: {
      count: {
        type: Number,
        required: true,
      },
      count_type: {
        type: String,
        required: true,
      },
    },
    speakingTime: {
      count: {
        type: Number,
        required: true,
      },
      count_type: {
        type: String,
        required: true,
      },
    },
    isPremium: {
      type: Boolean,
    },
  },
});

export const PartTwo =
  mongoose.models.PartTwo || mongoose.model("PartTwo", part_twoSchema);

// students

let studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  reading: {
    type: Number,
    required: true,
  },
  speaking: {
    type: Number,
    required: true,
  },
  listening: {
    type: Number,
    required: true,
  },
  writing: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  speakingAudio: {
    type: Buffer,
    required: true,
  },
});

export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

// StartTime

let StartTimeSchema = new Schema({
  hour: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

export const StartTime =
  mongoose.models.StartTime || mongoose.model("StartTime", StartTimeSchema);
