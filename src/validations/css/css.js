import Validator from '../Validator';
import css from 'css';

const errorMap = {
  'missing \'}\'': () => ({reason: 'missing-curly'}),

  'property missing \':\'': () => ({
    reason: 'property-missing-colon',
    suppresses: ['invalid-token', 'missing-curly'],
  }),

  'selector missing': () => ({
    reason: 'selector-missing',
    suppresses: ['invalid-token'],
  }),
};

class CssValidator extends Validator {
  constructor(source) {
    super(source, 'css', errorMap);
  }

  _getRawErrors() {
    return css.parse(this._source, {silent: true}).stylesheet.parsingErrors;
  }

  _keyForError(error) {
    return error.reason;
  }

  _locationForError(error) {
    const row = error.line - 1;
    const column = error.column - 1;
    return {row, column};
  }
}

export default (source) => new CssValidator(source).getAnnotations();
