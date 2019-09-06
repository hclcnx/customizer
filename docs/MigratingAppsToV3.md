# Migrating HCL Customizer Apps from Pilot to Production

Connections Customizer has moved from a pilot program to a production offering on Connections Cloud. If you participated in the pilot program and wish to take your pilot apps to production, then you must move them to the production environment. This migration **only affects the JSON application designs** you defined within the Application Registry. In other words, the include files resident in any repository referenced by your app (e.g. JavaScript, CSS or other web resources) are not impacted. 

The App Registry migration process for Customizer apps is simple and can be summarized as follows:

## Migration Steps to Follow
1. Log into your pilot organization as Administrator
2. Navigate to *Admin > Manage Organizations > Organization Extensions*
3. Select a Customizer application you wish to move to production
4. Export the JSON definition locally using the download icon in the top corner of the workpace tile 
5. Click the *new Apps Manager* link at the top of the application workspace
6. From the JSON editor, click the *Import* button at the bottom of the screen
7. Select the JSON file you created in Step 4
8. When the JSON content is imported, click *Save* in the App Editor
9. Validate that the app appears as a new tile entry in your workspace
10. Validate that the app continues to work as before
11. Repeat Steps 3 - 11 for any other applications you wish to migrate

Congratulations - you have migrated your applications to production and they are now running in Connections Pink! You can also view [a short video][1] on this topic which does a walk through of the steps outlined above. Please refer to the doc for the latest features and updates. 

[1]: https://youtu.be/sPpUqhalkiA
