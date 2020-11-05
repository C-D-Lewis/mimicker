# mimicker

A simple 'quote bot' style Twitter bot running on AWS Lambda.

## Deploy

1. Clone this repo, run `npm ci`.

2. Export `AWS_PROFILE` with your AWS CLI profile name with access to Lambda.

3. Log into the AWS Lambda Console, and create a new blank Lambda function.

4. Run `./upload.sh $FUNCTION_NAME` where `FUNCTION_NAME` is the name of the
   created Lambda function.


## Configure

Once the code in in place, set the following Lambda environment variables for
access to the chosen Twitter account.

* `CONSUMER_KEY` - Twitter API Consumer key.
* `CONSUMER_SECRET` - Twitter API Consumer secret.
* `ACCESS_TOKEN_KEY` - Twitter API access token key.
* `ACCESS_TOKEN_SECRET` - Twitter API access token secret.

These can be found on the Twitter developer dashboard after creating a project
to represent the bot.

Also specify where the quotes can be found:

* `QUOTES_FILE_URL` - URL to the file containing the quotes (such as on S3).


## Schedule

To tweet on a schedule:

1. Log into the AWS EventBridge Console.
2. Create a new Rule, choosing the 'Fixed rate every' option.
3. Enter a fixed rate interval, such as every 6 hours.
4. Choose your Lambda function as the target.

The Lambda function will now run on schedule, tweeting a quote each time!
