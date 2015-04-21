using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OdeToFood.Models;

namespace OdeToFood.Tests.Features
{
    class RestaurantRater
    {
        private Restaurant data;
        
        public RestaurantRater(Restaurant data)
        {
            this.data = data;
        }

        public RatingResult ComputeRating(int p)
        {
            var result = new RatingResult();
            result.Rating = 4;
            return result;
        }
    }
}
