import Slowparse from 'slowparse/src';
import Validator from '../Validator';

const errorMap = {
  ATTRIBUTE_IN_CLOSING_TAG: (error) => ({
    reason: 'attribute-in-closing-tag',
    payload: {tag: error.closeTag.name},
  }),

  CLOSE_TAG_FOR_VOID_ELEMENT: (error) => ({
    reason: 'close-tag-for-void-element',
    payload: {tag: error.closeTag.name},
  }),

  HTML_CODE_IN_CSS_BLOCK: () => ({reason: 'html-in-css-block'}),

  INVALID_ATTR_NAME: (error) => ({
    reason: 'invalid-attribute-name',
    payload: {attribute: error.attribute.name.value},
    suppresses: ['lower-case-attribute-name'],
  }),

  INVALID_TAG_NAME: (error) => ({
    reason: 'invalid-tag-name',
    payload: {tag: error.openTag.name},
  }),

  UNSUPPORTED_ATTR_NAMESPACE: (error) => ({
    reason: 'invalid-attribute-name',
    payload: {attribute: error.attribute.name.value},
    suppresses: ['lower-case-attribute-name'],
  }),

  MULTIPLE_ATTR_NAMESPACES: (error) => ({
    reason: 'invalid-attribute-name',
    payload: {attribute: error.attribute.name.value},
    suppresses: ['lower-case-attribute-name'],
  }),

  MISMATCHED_CLOSE_TAG: (error) => ({
    reason: 'mismatched-close-tag',
    payload: {open: error.openTag.name, close: error.closeTag.name},
  }),

  SELF_CLOSING_NON_VOID_ELEMENT: (error) => ({
    reason: 'self-closing-non-void-element',
    payload: {tag: error.name},
  }),

  UNCLOSED_TAG: (error) => ({
    reason: 'unclosed-tag',
    payload: {tag: error.openTag.name},
  }),

  UNEXPECTED_CLOSE_TAG: (error) => ({
    reason: 'unexpected-close-tag',
    payload: {tag: error.closeTag.name},
  }),

  UNTERMINATED_ATTR_VALUE: (error) => ({
    reason: 'unterminated-attribute-value',
    payload: {attribute: error.attribute.name.value, tag: error.openTag.name},
  }),

  UNTERMINATED_OPEN_TAG: (error) => ({
    reason: 'unterminated-open-tag',
    payload: {tag: error.openTag.name},
    suppresses: ['attribute-value', 'lower-case', 'lower-case-attribute-name'],
  }),

  UNTERMINATED_CLOSE_TAG: (error) => ({
    reason: 'unterminated-close-tag',
    payload: {tag: error.closeTag.name},
  }),

  UNTERMINATED_COMMENT: () => ({reason: 'unterminated-comment'}),

  UNBOUND_ATTRIBUTE_VALUE: (error) => ({
    reason: 'unbound-attribute-value',
    payload: {value: error.value},
    suppresses: ['attribute-value', 'lower-case-attribute-name'],
  }),
};

class SlowparseValidator extends Validator {
  constructor(source) {
    super(source, 'html', errorMap);
  }

  _getRawErrors() {
    const error = Slowparse.HTML(document, this._source).error;

    if (error !== null) {
      return [error];
    }

    return [];
  }

  _keyForError(error) {
    return error.type;
  }

  _locationForError(error) {
    const lines = this._source.slice(0, error.cursor).split('\n');
    const row = lines.length - 1;
    const column = lines[row].length - 1;
    return {row, column};
  }
}

export default (source) => new SlowparseValidator(source).getAnnotations();
