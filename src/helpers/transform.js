import postcss from "postcss";
import postcssJs from "postcss-js";
import transform from "css-to-react-native";

const toJSSObject = (cssText) => {
  const root = postcss.parse(cssText);
  return postcssJs.objectify(root);
};

const optimizeCode = (jsObject) => {
  jsObject.display == "flex" && delete jsObject.display;
  jsObject.fontSize == 16 && delete jsObject.fontSize;
  jsObject.fontWeight == "400" && delete jsObject.fontWeight;
  jsObject.lineHeight && delete jsObject.lineHeight;
  jsObject.letterSpacing && delete jsObject.letterSpacing;

  const {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginHorizontal,
    marginVertical,
  } = jsObject;

  if (paddingTop && paddingTop === paddingBottom) {
    delete jsObject.paddingTop;
    delete jsObject.paddingBottom;
    jsObject.paddingVertical = paddingTop;
  }
  if (paddingLeft && paddingLeft === paddingRight) {
    delete jsObject.paddingLeft;
    delete jsObject.paddingRight;
    jsObject.paddingHorizontal = paddingLeft;
  }

  if (paddingHorizontal && paddingHorizontal === paddingVertical) {
    delete jsObject.paddingHorizontal;
    delete jsObject.paddingVertical;
    jsObject.paddingHorizontal = paddingVertical;
  }

  if (marginTop && marginTop === marginBottom) {
    delete jsObject.marginTop;
    delete jsObject.marginBottom;
    jsObject.marginVertical = marginBottom;
  }

  if (marginLeft && marginLeft === marginRight) {
    delete jsObject.marginLeft;
    delete jsObject.marginRight;
    jsObject.marginHorizontal = marginRight;
  }

  if (marginVertical && marginVertical === marginHorizontal) {
    delete jsObject.marginVertical;
    delete jsObject.marginHorizontal;
    jsObject.marginVertical = marginHorizontal;
  }

  return jsObject;
};

function customStringify(obj, indentLevel = 0, indentSize = 2) {
  const indent = " ".repeat(indentLevel * indentSize);
  const newLine = "\n";

  let result = "{" + newLine;

  const keys = Object.keys(obj);
  const lastKeyIndex = keys.length - 1;

  keys.forEach((key, index) => {
    const value = obj[key];
    const formattedValue = JSON.stringify(value, null, indentSize);

    result += indent + " ".repeat(indentSize) + key + ": " + formattedValue;

    if (index !== lastKeyIndex) {
      result += ",";
    }

    result += newLine;
  });

  result += "}";
  return result;
}

export const toJSS = (cssText) => {
  try {
    return JSON.stringify(toJSSObject(cssText), null, 2);
  } catch (e) {
    return "Error translating CSS to JSS";
  }
};

export const toRN = (cssText) => {
  try {
    const output = toJSSObject(cssText);
    const result = Object.keys(output).map((rules) => [rules, output[rules]]);
    const jsObj = transform(result);
    console.log(jsObj);
    const rnCss = customStringify(optimizeCode(jsObj), 1);
    return rnCss;
  } catch (e) {
    return "Error translating CSS to RN";
  }
};
