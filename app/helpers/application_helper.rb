module ApplicationHelper

  def clippy(text, format=:html)
    id = "clippy_#{rand(10000000)}"
    content = <<-EOS
      <div class="clippy_wapper">
        <div id="#{id}" class="clippy">
          <span style="display:none" class="clippy_code">#{CGI.escapeHTML(text)}</span>
          <span class="clippy_label"></span>
          <object type="application/x-shockwave-flash" data="/flash/clippy.swf" width="14" height="14" id="#{id}_flash">
          <param name="movie" value="/flash/clippy.swf" />
          <param name="allowScriptAccess" value="always" />
          <param name="quality" value="high" />
          <param name="scale" value="noscale" />
          <param name="FlashVars" value="target=##{id}" />
          <param name="bgcolor" value="#E0E0E0" />
          </object>
        </div>
      </div>
    EOS
    content += CodeRay.scan(text, format).div(css: :class)
    content.html_safe
  end

  def content_for_clippy(&block)
    content_for :code, &block
    content_tag :div, &block
  end

end
