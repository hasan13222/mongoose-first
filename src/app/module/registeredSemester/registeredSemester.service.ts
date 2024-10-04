import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { SemesterModel } from '../semester/semester.model';
import { TRegisteredSemester } from './registeredSemester.interface';
import { RegisteredSemester } from './registeredSemester.model';
import { registeredSemesterStatusObj } from './registeredSemester.constants';

const createRegisterdSemesterIntoDB = async (payload: TRegisteredSemester) => {
  // checking if semester exists in semester database
  const isSemesterExist = await SemesterModel.findById(payload.semester);
  if (!isSemesterExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'semester not found');
  }

  //   checking if semester already registered
  const isSemesterRegistered = await RegisteredSemester.findOne({
    semester: payload.semester,
  });
  if (isSemesterRegistered) {
    throw new AppError(StatusCodes.CONFLICT, 'semester already registered');
  }

  // checking if any semester is upcoming or ongoing
  const isAnyRegSemesterRunning = await RegisteredSemester.findOne({
    $or: [{ status: 'Upcoming' }, { status: 'Ongoing' }],
  });
  if (isAnyRegSemesterRunning) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `Already a semester is ${isAnyRegSemesterRunning.status}`,
    );
  }
  const result = await RegisteredSemester.create(payload);
  return result;
};

const getAllRegisterdSemesterFromDB = async () => {
  const result = await RegisteredSemester.find();
  return result;
};

const updateSingleRegisterdSemesterIntoDB = async (
  id: string,
  payload: Partial<TRegisteredSemester>,
) => {
  // check if the update request id is valid
  const isSemesterRegistered = await RegisteredSemester.findById(id);
  if (!isSemesterRegistered) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Semester is not registered');
  }

  // check the business logic that is semester updating from upcoming to ongoing or ongoing to ended
  const { Upcoming, Ongoing, Ended } = registeredSemesterStatusObj;
  const reqStatus = payload.status;
  const semesterStatus = isSemesterRegistered.status;

  const isSemesterStatusNotChanged = semesterStatus === reqStatus;
  const isUpdateFromUpcomingToOngoing =
    semesterStatus === Upcoming && reqStatus === Ongoing;
  const isUpdateFromOngoingToEnded =
    semesterStatus === Ongoing && reqStatus === Ended;
  const isUpdateReqValid =
    isUpdateFromUpcomingToOngoing ||
    isUpdateFromOngoingToEnded ||
    isSemesterStatusNotChanged;
  if (payload.status && !isUpdateReqValid) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `Semester status cannot change from ${isSemesterRegistered.status} to ${payload.status}. It should be upcoming to ongoing or ongoing to ended.`,
    );
  }

  const result = await RegisteredSemester.findByIdAndUpdate(id, payload, {new: true});
  return result;
};

export const RegisteredSemesterServices = {
  createRegisterdSemesterIntoDB,
  getAllRegisterdSemesterFromDB,
  updateSingleRegisterdSemesterIntoDB,
};
