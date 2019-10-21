module.exports = {
  name: 'ngrc-platform',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngrc-platform',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
