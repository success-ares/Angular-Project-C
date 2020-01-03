const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();

// Add Functions Here

exports.handleNewGenericPageSection = functions.database.ref('genericPages/pagesListDetails/{pageId}/sections/{sectionId}')
  .onCreate((change, context) => {
    const pageId = context.params.pageId;
    const sectionId = context.params.sectionId;
    const ref = admin.database().ref();
    return ref.child(`/genericPages/pagesListDetails/${pageId}/sections`).once('value', snap => {
      const sections = snap.val();
      const length = Object.keys(sections).length;
      var link = change.val().right.title;
      link = link.replace(/\s+/g, '-').toLowerCase();
      console.log(sections);
      console.log(length);
      return ref.child(`/genericPages/pagesListDetails/${pageId}/sections/${sectionId}/right`).update({
        order: length - 1,
        link: `${link}-${length - 1}`
      });
    });
  });


exports.handleCreateAndUpdatedInCareersListDetails = functions.database.ref('/careers/careersListDetails/{careerId}')
  .onWrite((change, context) => {
    // Exit when the data is deleted.
    if (!change.after.exists()) {
      return null;
    }
    const careerId = context.params.careerId;
    const careerTitle = change.after.val().title;
    const category = change.after.val().category;
    const ref = admin.database().ref();
    return ref.child(`/careers/careersListMetadata/${careerId}`)
      .update({
        title: careerTitle,
        category: category,
      });
  });

exports.handleUpdateInCareersListMetadata = functions.database.ref('/careers/careersListMetadata/{careerId}')
  .onUpdate((change, context) => {
    const careerId = context.params.careerId;
    const category = change.after.val().category;
    const ref = admin.database().ref();
    return ref.child(`/careers/careersListDetails/${careerId}/category`).set(category);
  });


exports.handleDeleteInCareersListMetadata = functions.database.ref('/careers/careersListMetadata/{careerId}')
  .onDelete((change, context) => {
    const careerId = context.params.careerId;
    const ref = admin.database().ref();
    return ref.child(`/careers/careersListDetails/${careerId}`).remove();
  });

exports.handleCreateAndUpdatedInGenericPagesListDetails = functions.database.ref('/genericPages/pagesListDetails/{pageId}')
  .onWrite((change, context) => {
    // Exit when the data is deleted.
    if (!change.after.exists()) {
      return null;
    }
    const pageId = context.params.pageId;
    const pageTitle = change.after.val().title;
    const ref = admin.database().ref();
    return ref.child(`/genericPages/pagesListMetadata/${pageId}/title`).set(pageTitle);
  });

exports.handleDeleteInPagesListMetadata = functions.database.ref('/genericPages/pagesListMetadata/{pageId}')
  .onDelete((change, context) => {
    const pageId = context.params.pageId;
    const ref = admin.database().ref();
    return ref.child(`/genericPages/pagesListDetails/${pageId}`).remove();
  });

exports.handleCreateAndUpdatedInCareersBenefitsListDetails = functions.database.ref('/careers/benefitsListDetails/{benefitId}')
  .onWrite((change, context) => {
    // Exit when the data is deleted.
    if (!change.after.exists()) {
      return null;
    }
    const benefitId = context.params.benefitId;
    const careerHeader = change.after.val().header;
    const ref = admin.database().ref();
    return ref.child(`/careers/benefitsListMetadata/${benefitId}/header`).set(careerHeader);
  });

exports.handleDeleteInCareersBenefitsListMetadata = functions.database.ref('/careers/benefitsListMetadata/{benefitId}')
  .onDelete((change, context) => {
    const benefitId = context.params.benefitId;
    const ref = admin.database().ref();
    return ref.child(`/careers/benefitsListDetails/${benefitId}`).remove();
  });

/**
 * Function to operate as the Server Side Rendering Engine
 */
exports.universal = functions.https.onRequest((request, response) => {
  require(`${process.cwd()}/dist/server`).app(request, response);
});
