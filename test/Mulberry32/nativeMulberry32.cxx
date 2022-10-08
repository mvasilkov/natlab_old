#include <nan.h>

#include "Mulberry32.c"

void SetState(const Nan::FunctionCallbackInfo<v8::Value> &args)
{
    if (args.Length() < 1 || !args[0]->IsNumber())
    {
        Nan::ThrowTypeError("This function accepts a number");
        return;
    }

    v8::Isolate *isolate = args.GetIsolate();
    v8::Local<v8::Context> context = isolate->GetCurrentContext();

    x = (uint32_t)args[0]->NumberValue(context).FromMaybe(0);
}

void GetUint32(const Nan::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Local<v8::Number> result = Nan::New<v8::Number>(next());

    args.GetReturnValue().Set(result);
}

void Init(v8::Local<v8::Object> exports)
{
    v8::Local<v8::Context> context = exports->CreationContext();

    exports->Set(context, Nan::New("setState").ToLocalChecked(),
                 Nan::New<v8::FunctionTemplate>(SetState)->GetFunction(context).ToLocalChecked());
    exports->Set(context, Nan::New("getUint32").ToLocalChecked(),
                 Nan::New<v8::FunctionTemplate>(GetUint32)->GetFunction(context).ToLocalChecked());
}

NODE_MODULE(nativeMulberry32, Init)
