const asyncHandler = require('express-async-handler');
const { client, google } = require('./user');

const docs = google.docs({ version: 'v1', auth: client });

const getText = asyncHandler(async (req, res) => {
  const docId = req.params.id;
  const docRes = await docs.documents.get({
    documentId: docId,
  });
  res.status(200).json(docRes);
});

const insertText = asyncHandler(async (req, res) => {
  const docId = req.params.id;
  const docRes3 = await docs.documents.get({
    documentId: docId,
  });
  if (docRes3.data.body.content.length > 2) {
    await docs.documents.batchUpdate({
      documentId: docId,
      resource: {
        requests: [
          {
            deleteContentRange: {
              range: {
                segmentId: '',
                startIndex: 1,
                endIndex: docRes3.data.body.content[docRes3.data.body.content.length - 1].endIndex - 1,
              },
            },
          },
        ],
      },
    });
  }
  const docsRes2 = await docs.documents.batchUpdate({
    documentId: docId,
    resource: {
      requests: [
        {
          insertText: {
            text: req.body.string1,
            endOfSegmentLocation: {
              segmentId: '',
            },
          },
        },
        {
          insertText: {
            text: req.body.string2,
            endOfSegmentLocation: {
              segmentId: '',
            },
          },
        },
        {
          insertText: {
            text: req.body.string3,
            endOfSegmentLocation: {
              segmentId: '',
            },
          },
        },
        {
          insertText: {
            text: req.body.string4,
            endOfSegmentLocation: {
              segmentId: '',
            },
          },
        },
        {
          insertText: {
            text: req.body.string5,
            endOfSegmentLocation: {
              segmentId: '',
            },
          },
        },
        {
          insertText: {
            text: req.body.string6,
            endOfSegmentLocation: {
              segmentId: '',
            },
          },
        },
      ],
    },
  });

  res.status(200).json(docsRes2);
});

module.exports = { getText, insertText };
