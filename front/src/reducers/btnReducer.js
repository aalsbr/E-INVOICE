const defualtState = {
  btnSave: [],
};

const btnSave = (state = defualtState, { type, payload }) => {

  switch (type) {

    case "add":
      return { btnSave:[...state.btnSave, payload] };
      
    case "edit":
      const newArray = [...state.btnSave]; //making a new array

      if (payload[2] === 1) newArray[payload[0]].name = payload[1];
      if (payload[2] === 2 && payload[1] >= 0)
        newArray[payload[0]].quntity = payload[1];
      if (payload[2] === 3 && payload[1] >= 0)
        newArray[payload[0]].price = payload[1];

      newArray[payload[0]].total =
        newArray[payload[0]].quntity * newArray[payload[0]].price;

      //changing value in the new array
      return {
        btnSave: newArray,
      };
    case "remove":
      return { btnSave: state.btnSave.filter((e) => e.id !== payload.id) };

    default:
      return state;
  }
};

export default btnSave;


export const changeState = (payload) => {
  return {
    type: "add",
    payload: payload,
  };
};

export const edit = (payload) => {
  return {
    type: "edit",
    payload: payload,
  };
};
export const remove = (payload) => {
  return {
    type: "remove",
    payload: payload,
  };
};
