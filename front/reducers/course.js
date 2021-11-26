import produce from "immer";
import shortid from "shortid";

export const initialState = {
  courseInfo: [],

  addCourseLoading: false,
  addCourseDone: false,
  addCourseError: null,
};

export const ADD_COURSE_REQUEST = "ADD_COURSE_REQUEST";
export const ADD_COURSE_SUCCESS = "ADD_COURSE_SUCCESS";
export const ADD_COURSE_FAILURE = "ADD_COURSE_FAILURE";

export const INITIALIZE_VALUES = "INITIALIZE_VALUES";

export const addCourse = (data) => {
  return {
    type: ADD_COURSE_REQUEST,
    data,
  };
};

const dumyCourse = (data) => {
  return {
    id: data.id,
    User: {
      id: data.content.userId,
      nickname: data.content.userNickname,
    },
    area: data.content.area,
    title: data.content.title,
    filePath: data.content.filePath,
    description: data.content.description,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case INITIALIZE_VALUES:
        draft.addCourseLoading = false;
        draft.addCourseDone = false;
        draft.addCourseError = null;
        break;
      case ADD_COURSE_REQUEST:
        draft.addCourseLoading = true;
        draft.addCourseDone = false;
        draft.addCourseError = null;
        break;
      case ADD_COURSE_SUCCESS:
        draft.addCourseLoading = false;
        draft.addCourseDone = true;
        draft.courseInfo.unshift(dumyCourse(action.data));
        break;
      case ADD_COURSE_FAILURE:
        draft.addCourseLoading = false;
        draft.addCourseError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
