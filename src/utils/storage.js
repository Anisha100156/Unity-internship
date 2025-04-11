export const saveToStorage = (data) => {
  localStorage.setItem("studentCards", JSON.stringify(data));
};

export const loadFromStorage = () => {
  const data = localStorage.getItem("studentCards");
  return data ? JSON.parse(data) : [];
};
