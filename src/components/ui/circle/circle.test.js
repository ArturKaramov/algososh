import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";
import renderer from "react-test-renderer";

describe("Testing Circle", () => {
  it("Circle without letter", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with letter", () => {
    const tree = renderer.create(<Circle letter="T" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with head", () => {
    const tree = renderer.create(<Circle head="T" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with React element as head", () => {
    const tree = renderer.create(<Circle letter={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with tail", () => {
    const tree = renderer.create(<Circle tail="T" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with React element as tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle with index", () => {
    const tree = renderer.create(<Circle index="T" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle small", () => {
    const tree = renderer.create(<Circle isSmall="true" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle default", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
