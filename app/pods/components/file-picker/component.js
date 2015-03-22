import Ember from 'ember';

export default Ember.Component.extend({
  textServices: ['BOX', 'COMPUTER', 'DROPBOX', 'EVERNOTE', 'FTP', 'GITHUB', 'GOOGLE_DRIVE', 'SKYDRIVE', 'WEBDAV', 'GMAIL', 'URL'],
  textTypes: ['text/*', 'application/msword'],
  imageServices: ['COMPUTER', 'FACEBOOK', 'GMAIL', 'BOX', 'DROPBOX', 'FLICKR', 'PICASA', 'INSTAGRAM'],
  imageTypes: ['image/*'],
  store: null,

  actions: {
    didInsertElement: function () {
      if (!this.get('store')) {
        throw 'FilePicker Component requires store for creating files. Inject as store=store';
      }
    },

    pickWithFilepicker: function () {
      var self = this;
      var serviceType = this.get('serviceType') || 'image';

      var newFile = this.get('store').createRecord('image', {
        ready: false
      });
      newFile.save();

      // Bubble 'save' action up to the Controller
      self.sendAction('save', newFile);

      filepicker.pick(
        {
          container: 'window',
          mimetypes: this.get(serviceType + 'Types'),
          services: this.get(serviceType + 'Services')
        },
        function (blob) {
          newFile.set('url', blob.url);
          newFile.set('filename', blob.filename);
          newFile.set('size', Math.round((blob.size / 1024 + 0.00001) * 100) / 100);
          newFile.save();

          // get image's width and height, then add to file
          filepicker.stat(blob,
            {width: true, height: true},
            function (metadata) {
              newFile.set('width', metadata.width);
              newFile.set('height', metadata.height);
              newFile.set('ready', true);
              newFile.save();
            },
            function (FPError) {
              // unless dialog closed by user
              if (FPError.code !== 101) {
                self.sendAction('error', FPError.toString());
              }
            }
           );
        },
        function (FPError) {
          // unless dialog closed by user
          if (FPError.code !== 101) {
            self.sendAction('error', FPError.toString());
          }
        }
      );
    }
  }
});
