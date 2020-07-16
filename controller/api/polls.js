const express = require('express');
const router = express.Router();
const Poll=require("../../model/Poll");


/*
    @route  api/polls/create
    @desc  Create a poll
    @access private [ONLY ADMINS]
*/
router.post('/create', (req, res) => {
  

const newPoll = new Poll({
  question: req.body.question,
  choices:req.body.choices,
  author:req.body.author,

});

newPoll.save().then(poll => {
  res.json(poll);
});
});

/*
    @route  api/polls/show
    @desc  Get All Polls
    @access public[USERS AND ADMIN]
*/
router.get('/show', (req, res) => {
Poll.find().populate('author')
    .then(polls => res.json(polls));
});



/*
    @route  api/polls/delete/:id
    @desc  DELETE A POLL BY ITS ID
    @access Private
*/
router.delete('/delete/:id', (req, res) => {
Poll.findById(req.params.id)
    .then(poll => poll.remove().then(() => res.json({ success: true })))
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

/*
    @route  api/polls/vote
    @desc Vote for a specific Poll
    @access public
*/
router.put('/vote/:userId/:pId/:choice', (req, res) => {
  Poll.findOne(
    {
_id:req.params.pId

     })
      .then(poll => {
        if(poll.expired===true){
          res.json("Poll has Expired")
        }
        else{
          Poll  .findOne(
            {_id:req.params.pId,
               voters:req.params.userId
            }
               )
                   .then(voters=> {
                     if(voters){
                       res.json("You cannot vote Again")
                       
                     }
                
                    if(!voters ){
                      Poll.findOneAndUpdate(
                        {_id:req.params.pId,
                         
                        choices:{$elemMatch:{_id:(req.params.choice)}}
                      },
                      {
                        $inc:{["choices.$.vote"]:1},
                        $addToSet:{voters:req.params.userId}
                      }
                      )
                      .then(polls => res.json("Your vote has been placed"));
                      
                    
                   
                    }
                  })
        }
      });
 
});
/*
    @route  api/polls/close
    @desc CLOSE POLLS AFTER A SPECIFIC PERIOD
    @access public
*/
router.put('/close/:pId', (req, res) => {
Poll  .findOneAndUpdate(
  {
    _id:req.params.pId,
   
  },
  {
    $set:{expired:true}
  })
  
 
      .then(closed => {
        if (closed) {
          res.json("This Poll has been Closed");
        }
      });
});
router.post('/decision/:id', (req, res) => {
  Poll.findOne(
    {
_id:req.params.id,

     })
      .then(poll => {
        if(poll.expired===false){
          res.json("false")
        }
        else{
          res.json("true")
        }
      })
});
/*
    @route  api/poll/fetch/:id
    @desc Get Specific Poll detail
    @access private
*/
router.get('/fetch/:id', (req, res) => {
Poll .findOne({_id:req.params.id })
      .then(poll => {
        if (poll){
         // if condition is TRUE do something
         res.json(poll)
        } else {
         // do something else
         res.json("OOPS")
        };
      })
});
module.exports = router;
