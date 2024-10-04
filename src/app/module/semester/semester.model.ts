import { Schema, model } from 'mongoose';
import { TMonth, TSemester } from './semester.interface';

const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const semesterSchema = new Schema<TSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

semesterSchema.pre('save', async function (next) {
  const isSemesterExist = await SemesterModel.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExist) {
    throw new Error('Semester already exists');
  } else {
    next();
  }
});

export const SemesterModel = model<TSemester>('Semester', semesterSchema);
