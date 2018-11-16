using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

            // start server and send gaze data upon socket opening
            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Socket Open!");
                    allSockets.Add(socket);

                    gazePointDataStream.GazePoint((x, y, ts) =>
                    {
                        // send gaze data
                        allSockets.ToList().ForEach(s => s.Send(String.Concat(x.ToString(), ",", y.ToString())));
                    });
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Close!");
                    allSockets.Remove(socket);
                };

                socket.OnMessage = message =>
                {
                    Console.WriteLine(message);
                    allSockets.ToList().ForEach(s => s.Send("Echo: " + message));
                };
                
                
            });

            host.DisableConnection();
        }
    }
}
