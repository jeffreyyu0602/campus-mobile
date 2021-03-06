import 'package:campus_mobile_experimental/core/models/events_model.dart';
import 'package:campus_mobile_experimental/ui/reusable_widgets/container_view.dart';
import 'package:campus_mobile_experimental/ui/reusable_widgets/image_loader.dart';
import 'package:campus_mobile_experimental/ui/reusable_widgets/time_range_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_linkify/flutter_linkify.dart';
import 'package:url_launcher/url_launcher.dart';

class EventDetailView extends StatelessWidget {
  const EventDetailView({Key key, @required this.data}) : super(key: key);
  final EventModel data;
  @override
  Widget build(BuildContext context) {
    return ContainerView(
      child: ListView(
        children: buildDetailView(context),
      ),
    );
  }

  List<Widget> buildDetailView(BuildContext context) {
    return [
      Center(
        child: ImageLoader(
          url: data.imageHQ,
          fullSize: true,
        ),
      ),
      Divider(),
      Text(
        data.title,
        textAlign: TextAlign.center,
        style: Theme.of(context).textTheme.title,
      ),
      Divider(),
      Linkify(
        onOpen: (link) async {
          if (await canLaunch(link.url)) {
            await launch(link.url);
          } else {
            throw 'Could not launch $link';
          }
        },
        text: data.location,
        textAlign: TextAlign.center,
        style: TextStyle(fontSize: 16),
        options: LinkifyOptions(humanize: false),
      ),
      Center(
          child: TimeRangeWidget(time: data.startTime + ' - ' + data.endTime)),
      Divider(),
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: Linkify(
          onOpen: (link) async {
            if (await canLaunch(link.url)) {
              await launch(link.url);
            } else {
              throw 'Could not launch $link';
            }
          },
          options: LinkifyOptions(humanize: false),
          text: data.description,
          style: TextStyle(fontSize: 16),
        ),
      ),
      data.url != null && data.url.isNotEmpty
          ? Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: FlatButton(
                  child: Text(
                    'Learn More',
                    style: TextStyle(
                        fontSize: 16,
                        color: Theme.of(context).textTheme.button.color),
                  ),
                  color: Theme.of(context).buttonColor,
                  onPressed: () async {
                    try {
                      if (await canLaunch(data.url)) {
                        await launch(data.url);
                      } else {
                        throw 'Could not launch ${data.url}';
                      }
                    } catch (e) {
                      print(e);
                    }
                  }),
            )
          : Container(),
    ];
  }
}
