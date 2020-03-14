module.exports = {
  name: 'ngrc-platform',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngrc-platform',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
