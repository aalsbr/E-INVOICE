const defualtState = {
  btnSave: [],
};

const btnSave = (state = defualtState, { type, payload }) => {
  switch (type) {
    case "add":
      return { btnSave: [...state.btnSave, payload] };
      case "reset":
        return { btnSave: [] };

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
      const tempArr = [...state.btnSave]; //making a new array
      const data = tempArr.filter((e) => e.id !== payload);
      for (let i = 0; i < data.length; i++) {
        if (payload < data[i].id) data[i].id = data[i].id - 1;
      }

      return { btnSave: data };

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
export const reset = () => {
  return {
    type: "reset",
  };
};
