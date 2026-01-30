import mongoose from "mongoose";

export default function (modelName, schema,index=null,hooks=null) {
    // console.log({[modelName]:JSON.stringify(index)})
    const schemaObject = new mongoose.Schema(
        {
            ...schema,
            origin:{
                type: String,
                required: true,
                select:true,
            },        
            sortOrder: {
                type: Number,
                default: 0,
                select:false
            },
            isActive: {
                type: Boolean,
                default: true,
                select:false
            },
            isDeleted: {
                type: Boolean,
                default: false,
                select:false
            },
            deleted: {
                At: {
                    select:false,
                    type: Date
                },
                By: {
                    select:false,
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
            },
            created: {
                By: {
                    select:false,
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                From: {
                    select:false,
                    type: String,
                },
            
            },
            updated: {
                By: {
                    select:false,
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                From: {
                    select:false,
                    type: String
                }
            },
            
        }
        , {
            timestamps: true,
            versionKey: false,
            collection: modelName,
            toObject: {
                virtuals: true,
            },
            toJSON: {
                virtuals: true,
            },
        });
    if (index) {
        if(index instanceof Array){
            index.forEach((item) => {
                schemaObject.index(...item);
            });
        }else{
            schemaObject.index(...index);
        }
    }
    schemaObject.index({ sortOrder: 1, isActive: 1, isDeleted: 1 });
    if (hooks && hooks.pre) {
        Object.keys(hooks.pre).forEach((hook) => {
            schemaObject.pre(hook, hooks.pre[hook]);
        });
    }
    if (hooks && hooks.post) {
        Object.keys(hooks.post).forEach((hook) => {
            schemaObject.post(hook, hooks.post[hook]);
        });
    }
    if (hooks && hooks.method) {
        Object.keys(hooks.method).forEach((hook) => {
            schemaObject.methods[hook] = hooks.method[hook];
        });
    }
    if(hooks && hooks.virtuals) {
        Object.keys(hooks.virtuals).forEach((virtual) => {
            schemaObject.virtual(virtual).get(hooks.virtuals[virtual]);
        });
        schemaObject.set("toJSON", {
            virtuals: true,
        });
        schemaObject.set("toObject", {
            virtuals: true,
        });
    }
    return mongoose.model(modelName, schemaObject);
}

