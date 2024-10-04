import { TOfferedCourse } from './offeredCourse.interface';

export const checkTimeConflict = (
  allocatedSchedules: Partial<TOfferedCourse>[],
  startTime: string,
  endTime: string,
) => {
  const newStartTime = new Date(`1970-01-01T${startTime}`);
  const newEndTime = new Date(`1970-01-01T${endTime}`);

  for (const schedule of allocatedSchedules) {
    const allocatedStart = new Date(`1970-01-01T${schedule.startTime}`);
    const allocatedEnd = new Date(`1970-01-01T${schedule.endTime}`);

    return newStartTime < allocatedEnd && newEndTime > allocatedStart;
  }
};
