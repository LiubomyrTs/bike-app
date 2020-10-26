export const formValues = (fields: string[]) => (
  constructor: any,
  methodName: string,
  descriptor: PropertyDescriptor
): any => {
  const origFunction = descriptor.value;
  descriptor.value = async function wrapper(...args) {
    const formValues = {};
    fields.forEach((f) => {
      formValues[f] = (document.getElementById(f) as HTMLFormElement).value
    });
    let result = origFunction.apply(this, args);
    console.log(result);
    console.log(formValues);
    
    return await result(formValues);
  };
};
