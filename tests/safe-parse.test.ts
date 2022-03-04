import * as anx from '../src/index';

describe('safeParse', () => {

  test('returns the object for a valid string of the correct type', () => {
    const o = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'], success: true, 'error-messages': [], note: 'non-large file; adding content to git repository' };
    const json = JSON.stringify(o);
    expect(anx.safeParse(anx.isActionResult, json)).toEqual(o);
  });

  test('returns undefined for a valid string of incorrect type', () => {
    const o = { command: 'add', file: 'file one.jpg', input: ['file one.jpg'], success: true, 'error-messages': [], note: 'non-large file; adding content to git repository' };
    const json = JSON.stringify(o);
    expect(anx.safeParse(anx.isStatusAnx, json)).toBeUndefined();
  });

  test('returns undefined for a bad string', () => {
    const json = 'non-large file; adding content to git repository';
    expect(anx.safeParse(anx.isActionProgress, json)).toBeUndefined();
  });

});

describe('safeParseToArray', () => {

  const json = `{"byte-progress":6405,"action":{"command":"add","input":["file1.jpg"],"file":"file1.jpg"},"total-size":6405,"percent-progress":"100%"}
{"command":"add","success":true,"input":["file1.jpg"],"key":"SHA256E-s6405--88ae7e65f53feb9f06e334d7c1f5e8ec9ae30e66f7075fa97b22b14280dc338a.jpg","error-messages":[],"file":"file1.jpg"}
{"command":"add","note":"non-large file; adding content to git repository","success":true,"input":["file1.txt"],"error-messages":[],"file":"file1.txt"}
{"byte-progress":6404,"action":{"command":"add","input":["file2.jpg"],"file":"file2.jpg"},"total-size":6404,"percent-progress":"100%"}
{"command":"add","success":true,"input":["file2.jpg"],"key":"SHA256E-s6404--7abbf94d50640dc0501eeb9ec3d8234746a45d3c7ea721839c88cd7fbb9785eb.jpg","error-messages":[],"file":"file2.jpg"}
{"command":"add","note":"non-large file; adding content to git repository","success":true,"input":["file2.txt"],"error-messages":[],"file":"file2.txt"}`;

  test('returns the filtered list of the correct type', () => {
    const a = anx.safeParseToArray(anx.isActionProgress, json);
    expect(a).toHaveLength(2);
  });

  test('returns an empty array when passed the empty string', () => {
    const a = anx.safeParseToArray(anx.isActionProgress, '');
    expect(a).toHaveLength(0);
  });

});
