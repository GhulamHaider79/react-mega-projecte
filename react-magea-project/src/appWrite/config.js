import conf from '../conf/conf.js'
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class DatabaseService {
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client)
    }

    async createPost ({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                } 
            )
        } catch (error) {
            console.log('Appwrite service :: create post :: error ', error);
        }
    }


    async updatePost (slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                } 
            )
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error ', error);
        }
    }

    async deletePost (slug){
        try {
             await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug 
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: deletePost :: error ', error);
            return false
        }
    }


    async getPost (slug){
        try {
            return  await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug 
            )
           
        } catch (error) {
            console.log('Appwrite service :: getPost :: error ', error);
            
        }
    }


    async getPosts (queries = [Query.equal("status", "active")]){
        try {
            return  await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
           
        } catch (error) {
            console.log('Appwrite service :: getPosts :: error ', error);
            return false
        }
    }


     
    async uploadFile (file){
        try {
            return  await this.storage.createFile(
                conf.appWriteBucketId,
               ID.unique(),
               file
            )
           
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error ', error);
            return false
        }
    }


    async deleteFile (fileId){
        try {
             await this.storage.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true
           
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error ', error);
            return false
        }
    }


     getFilePreview (fileId){
        
            return this.storage.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )
    }




}

const databaseService = new DatabaseService();
export default databaseService