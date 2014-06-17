module CustomHelpers
  def menu_tag(url, label)
    "<li class='#{active_css(url)}'>" +
      "<a href='#{base_url + url}'>#{label}</a>" +
    "</li>"
  end

  def active_css(url)
    'active' if current_page.url == (base_url + url)
  end
end
