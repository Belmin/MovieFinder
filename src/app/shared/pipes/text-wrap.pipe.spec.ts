import { TextWrapPipe } from './text-wrap.pipe';

describe('TextWrapPipe', () => {
  it('create an instance', () => {
    const pipe = new TextWrapPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform).toBeDefined();
  });

  it('should render elipsis (...) at the end of string', () => {
    const pipe = new TextWrapPipe();
    const wrapLimit = 20;
    const textToTransform = 'Test1 test2 test3 test4 test5';
    const expectedResult = 'Test1 test2 test3 te...';
    expect(textToTransform.length).toBeGreaterThan(wrapLimit);
    expect(pipe.transform(textToTransform, wrapLimit)).toEqual(expectedResult);
  });

  it('should not render elipsis (...) at the end of string', () => {
    const pipe = new TextWrapPipe();
    const wrapLimit = 20;
    const textToTransform = 'Test1 test2 test3';
    const expectedResult = 'Test1 test2 test3';
    expect(textToTransform.length).toBeLessThan(wrapLimit);
    expect(pipe.transform(textToTransform, wrapLimit)).toEqual(expectedResult);
  });
});
