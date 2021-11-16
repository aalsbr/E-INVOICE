const defualtState = {
  editList: [],
};

const editList = (state = defualtState, { type, payload }) => {
  switch (type) {
    case "editAdd":
      return { editList: [...state.editList, payload] };

    case "cleen":
      return { editList: [] };

    case "editme":
      const newArray = [...state.editList]; //making a new array

      if (payload[2] === 1) newArray[payload[0]].name = payload[1];
      if (payload[2] === 2 && payload[1] >= 0)
        newArray[payload[0]].quntity = payload[1];
      if (payload[2] === 3 && payload[1] >= 0)
        newArray[payload[0]].price = payload[1];

      newArray[payload[0]].total =
        newArray[payload[0]].quntity * newArray[payload[0]].price;

      //changing value in the new array
      return {
        editList: newArray,
      };
    case "remove":
      const tempArr = [...state.editList]; //making a new array
      const data = tempArr.filter((e) => e.id !== payload);
      for (let i = 0; i < data.length; i++) {
        if (payload < data[i].id) data[i].id = data[i].id - 1;
      }

      return { editList: data };

    default:
      return state;
  }
};

export default editList;

export const editAdd = (payload) => {
  return {
    type: "editAdd",
    payload: payload,
  };
};

export const editModify = (payload) => {
  return {
    type: "editme",
    payload: payload,
  };
};
export const editRemove = (payload) => {
  return {
    type: "remove",
    payload: payload,
  };
};
export const cleen = () => {
  return {
    type: "cleen",
  };
};
