using System;
using System.Collections.Generic;
using System.Linq;
using Tobii.Interaction;
using Fleck;

namespace TobiiApp
{
    class Program
    {
        static void Main(string[] args)
        {
            // Fleck setup
            var allSockets = new List<IWebSocketConnection>() ;
            var server = new WebSocketServer("ws://0.0.0.0:8181");
               
            // Tobii setup
            var host = new Host();
            var gazePointDataStream = host.Streams.CreateGazePointDataStream();


            // start server
            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Socket Open!");
                    allSockets.Add(socket);
                    int counter = 0;

                    // get gaze data
                    gazePointDataStream.GazePoint((x, y, ts) =>
                    {
                        // send x,y data
                        counter++;

                        if (counter == 9)
                        {
                            allSockets.ToList().ForEach(s => s.Send(String.Concat(x.ToString(), ",", y.ToString())));
                            counter = 0;
                        }
                    });
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Close!");
                    allSockets.Remove(socket);
                };

            });

            Console.ReadKey();
            host.DisableConnection();
        }
    }
}
