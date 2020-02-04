using Keras.Models;
using Numpy;
using Python.Runtime;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HackApi
{
    public static class ModelUtil
    {
        const string MODEL_PATH = @"\models\xor.json";
        const string WEIGHTS_PATH = @"\models\xor.h5";
        public static BaseModel model;
        public static BaseModel Model
        {
            get
            {
                if (model == null)
                {
                    Init();
                }
                return model;
            }
        }

        public static void Init()
        {
            try
            {
                if (model == null)
                {
                    string path = Directory.GetCurrentDirectory();
                    model = Sequential.ModelFromJson(File.ReadAllText(path + MODEL_PATH));
                    model.LoadWeight(path + WEIGHTS_PATH);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public static NDarray ndArray = new NDarray(new float[,] { { 1, 1 } });
        public static string TestNDarray(float[] input)
        {
            try
            {
                //ndArray[0, 0] = input[0]; //не присваивается элемент по индексу, говорит float не присвоить ndArray!
                //var result = ndArray.ToString();
                //return result;

                //PythonEngine.BeginAllowThreads(); //не работает, дохнет на этой строке

                //Так тоже не работает
                string result;
                //var task = Task.Run(() =>
                //{
                //var m = np.array(input).reshape(1, 2);  //так массив присваивается, но дидлок все равно есть
                //result = m.ToString();
                //return result;

                //using (Py.GIL())
                //    {
                //var array = new float[1, input.Length];
                //for (int i = 0; i < input.Length; i++)
                //{
                //    array[0, i] = input[i];
                //}
                var array = new float[1, 2];
                var ndArray = new NDarray(array);
                result = ndArray.ToString();
                //ndArray.Dispose();  //работает 5-6 раз, но потом тоже дохнет
                //GC.KeepAlive(ndArray);  //нет эффекта
                //    }
                return result;
                //});
                //task.Wait();
                //return task.Result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public static string Predict(float[] input)
        {
            try
            {
                var array = new float[1, input.Length];
                for (int i = 0; i < input.Length; i++)
                {
                    array[0, i] = input[i];
                }

                string result;
                using (Py.GIL())
                {
                    var ndArray = new NDarray(array);
                    var prediction = Model.Predict(ndArray);
                    result = $"Предсказание для {ndArray.ToString()} = {prediction.ToString()}";
                }
                return result;

                //var ndArray = new NDarray(array);
                //var prediction = Model.Predict(ndArray);
                //var result = $"Предсказание для {ndArray.ToString()} = {prediction.ToString()}";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}
